// Copyright (c) 2023 Conrad Hale

using Microsoft.EntityFrameworkCore;

namespace MovieList.Models;

public class MovieListContext : DbContext
{
    public MovieListContext(DbContextOptions<MovieListContext> options)
        : base(options) { }

    public DbSet<Movie> Movies { get; set; }

    public void Initialize()
    {
        if (Movies.Any())
            return; // DB has been seeded

        Movies.AddRange(
            new()
            {
                Name = "Casablanca",
                Year = 1942,
                Rating = 7,
                Genre = Genre.Drama
            },
            new()
            {
                Name = "Wonder Woman",
                Year = 2017,
                Rating = 5,
                Genre = Genre.Action
            },
            new()
            {
                Name = "Moonstruck",
                Year = 1988,
                Rating = 8,
                Genre = Genre.RomCom
            });

        SaveChanges();
    }
}
