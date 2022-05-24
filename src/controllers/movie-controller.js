import { prisma } from "../helpers/utils.js";

export const getAllMovies = async (request, reply) => {
    try {
        const movie = await prisma.movies.findMany();
        return movie;
    } catch (error) {
        console.log(error);
        reply.status(500).send("Não foi possível encontrar os filmes");
    }
};


export const createMovie = async (request, reply) => {
    try {
        const { id } = request.user
        const { title, description, gender_id } = request.body
        console.log(request.body);
        const post = await prisma.movies.create({
            data: {
                title,
                description,
                gender: {
                    connect: { id: +gender_id }
                },
                user: {
                    connect: { id: Number(id) }
                }
            }
        })
        reply.status(201).send(post)
    } catch (error) {
        reply.status(500).send("Não foi possível criar o filme")
    }
}

export const uniqueMovie = async (request, reply) => {
    try {
        const { id } = request.params
        const movie = await prisma.movies.findUnique({
            where: { id: Number(id) },
        })
       reply.status(200).send(movie)
    } catch (error) {
        reply.status(500).send("Não foi possível encontror o filme")
    }
}

export const deleteMovie = async (request, reply) => {
  try {
      const {id} = request.body
      const post = await prisma.movies.delete({  
        where: { id:+(id) } 
      });
      reply.status(200).send(post);
  } catch (error) {
      console.log(error);
      reply.status(500).send("Não foi possível deletar o filme");
  }
};

export const putMovie = async (request, reply) => {
    try {
      
      const { title, description, gender_id } = request.body;
      const {id} = request.params
  
      const movies = await prisma.movies.update({
        where: {
          id: +id
        },
        data: {
          title,
          description,
          gender: {
          connect: { id: Number(gender_id) },
          }
        }
      })
      reply.send(movies);
    } catch (error) {
      console.log(error);
      reply.status(500).send("Não foi possível atualizar o filme");
    }
  };

export const patchMovie = async (request, reply) => {
    try {
      const data = { };
  
      if (request.body.title){
        data.title = request.body.title;
      };
  
      if (request.body.description){
        data.description = request.body.description;
      };
  
      if (request.body.gender_id){
        data.gender = {
          connect: { id: +gender_id }
          }
      };
  
      
      const {id} = request.params
      const movies = await prisma.movies.update({
        where: {
          id: +id,
        },
        data,
      })
      reply.send(movies);
   } catch (error) {
      console.log(error);
      reply.status(500).send("Não foi possível atualizar o filme");
    }
  };

  export const pagination = async (request, reply) => {
    try {
      const {skip=0 , take= 10} = request.query;
          
           const movie = await prisma.movies.findMany({
            skip: +skip ,
            take: +take ,
           
        })
        console.log(movie)
        reply.status(200).send(movie)
    } catch (error) {
        reply.status(500).send("Não foi possível ordenar os filmes")
    }
}