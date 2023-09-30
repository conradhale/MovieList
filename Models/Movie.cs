// Copyright (c) 2023 Conrad Hale

using System.ComponentModel.DataAnnotations;

namespace MovieList.Models;

public class Movie
{
    public int MovieId { get; set; }

    [Required(ErrorMessage = "Please enter a name.")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Please enter a year.")]
    [Range(1889, 2999, ErrorMessage = "Year must be after 1889.")]
    public int? Year { get; set; }

    [Required(ErrorMessage = "Please enter a rating.")]
    [Range(1, 10, ErrorMessage = "Rating must be between 1 and 10.")]
    public int? Rating { get; set; }

    [Required(ErrorMessage = "Please enter a genre.")]
    public Genre? Genre { get; set; }
}

public enum Genre
{
    Action = 0,
    Comedy = 1,
    Drama = 2,
    Horror = 3,
    Musical = 4,
    RomCom = 5,
    SciFi = 6
}
