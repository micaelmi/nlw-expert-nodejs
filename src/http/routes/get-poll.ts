import z from "zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { redis } from "../../lib/redis";

export async function getPoll(app: FastifyInstance) {
  app.get("/polls/:pollId", async (request, reply) => {
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    });
    const { pollId } = getPollParams.parse(request.params);

    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
      include: {
        options: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!poll) {
      return reply.status(400).send({ message: "Poll not found." });
    }

    const result = await redis.zrange(pollId, 0, -1, "WITHSCORES");
    // retorna: [ 'chave1', 'valor1', 'chave2', 'valor2' ...]

    // transforma a estrutura acima
    const votes = result.reduce((obj, row, index) => {
      if (index % 2 === 0) {
        const score = result[index + 1];
        Object.assign(obj, { [row]: Number(score) });
      }
      return obj;
    }, {} as Record<string, number>);

    return reply.send({
      poll: {
        id: poll.id,
        title: poll.title,
        options: poll.options.map((option) => {
          return {
            id: option.id,
            title: option.title,
            score: option.id in votes ? votes[option.id] : 0,
          };
        }),
      },
    });
  });
}
