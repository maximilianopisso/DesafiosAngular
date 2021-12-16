import { Movie } from '../models/movie.model';

export const moviesMock: Movie[] = [

  { id: 1,
    image: "https://m.media-amazon.com/images/M/MV5BY2FmZTY5YTktOWRlYy00NmIyLWE0ZmQtZDg2YjlmMzczZDZiXkEyXkFqcGdeQXVyNjg4NzAyOTA@._V1_.jpg",
    title: "The Big Bang Theory",
    description: "A woman who moves into an apartment across the hall from two brilliant but socially awkward physicists shows",
    actors: "Kaley Cuoco, Jim Parsons, Johnny Galecki",
    rating: 10,
  },

  {
    id: 2,
    image: "https://m.media-amazon.com/images/M/MV5BOTcwNzU2MGEtMzUzNC00MzMwLWJhZGItNDY3NDllYjU5YzAyXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg",
    title: "Silicon Valley",
    description: "Follows the struggle of Richard Hendricks, a Silicon Valley engineer trying to build his own company called Pied Piper.",
    actors: "Thomas Middleditch, Kumail Nanjiani, Zach Woods.",
    rating: 8,
  },

  {
    id: 3,
    image: "https://m.media-amazon.com/images/M/MV5BMzgxMmQxZjQtNDdmMC00MjRlLTk1MDEtZDcwNTdmOTg0YzA2XkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg",
    title: "Mr.Robot",
    description: "A woman who moves into an apartment across the hall from two brilliant but socially awkward physicists shows.",
    actors: "Kaley Cuoco, Jim Parsons, Johnny Galecki",
    rating: 9,
  },

  {
    id: 4,
    image: "https://m.media-amazon.com/images/M/MV5BMTczNjAyMDg1Nl5BMl5BanBnXkFtZTgwMDQyNTA2OTE@._V1_.jpg",
    title: "Halt and Catch Fire",
    description: "In 1983, former IBM sales executive Joe MacMillan joins Cardiff Electric, a Dallas-based mainframe software company.",
    actors: "Lee Pace, Mackenzie Davis, Kerry Bishé",
    rating: 7
  },

  {
    id: 5,
    image: "https://m.media-amazon.com/images/M/MV5BMTM5MjkwMTI0MV5BMl5BanBnXkFtZTcwODQwMTc0OQ@@._V1_.jpg",
    title: "Dexter",
    description: "By day, mild-mannered Dexter is a blood-spatter analyst for the Miami police. But at night, he is a serial killer who only targets other murderers.",
    actors: "Michael C. Hall, Jennifer Carpenter, David Zayas",
    rating: 8,
  }
];

