import * as movieController from '../controllers/movie-controller.js'
import { validateRequest } from '../middleware/auth.js';

export default {
    getAllMovies: {
        method: "GET",
        url: "/movies",
        handler: movieController.getAllMovies
    },
    uniqueMovie: {
        method: "GET",
        url: "/movies/:id",
        handler: movieController.uniqueMovie
    },
    createMovie: {
        method: "POST",
        url: "/movies",
        preHandler: [validateRequest],
        handler: movieController.createMovie
    },
    deleteMovie: {
        method: "DELETE",
        url: "/movies",
        // url: "/movies/:id", nao usa o id aqui pq é passado no body e nao no paramns
        preHandler: [validateRequest],
        handler: movieController.deleteMovie
    },
    patchMovie: {
        method: "PATCH",
        url: "/movies/:id",
        preHandler: [validateRequest],
        handler: movieController.patchMovie
    },
    putMovie:{
        method: "PUT",
        url: "/movies/:id",
        preHandler: [validateRequest],
        handler: movieController.putMovie
      },

      pagination:{
        method: "GET",
        url: "/movies/",
        handler: movieController.pagination
      },
};