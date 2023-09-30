// Copyright (c) 2023 Conrad Hale

using Microsoft.AspNetCore.Mvc;
using MovieList.Models;

namespace MovieList.Controllers;

public class MovieController : Controller
{
    private readonly MovieListContext Context;

    public MovieController(MovieListContext context) =>
        Context = context;

    [HttpGet]
    public IActionResult Add() =>
        View(new Movie());

    [HttpGet]
    public IActionResult Edit(int id) =>
        View(Context.Movies.Find(id));

    [HttpPost]
    public IActionResult Add(Movie movie)
    {
        if (!ModelState.IsValid)
            return View(movie);

        Context.Movies.Add(movie);
        Context.SaveChanges();
        return RedirectToAction("Index", "Home");
    }

    [HttpPost]
    public IActionResult Edit(Movie movie)
    {
        if (!ModelState.IsValid)
            return View(movie);

        Context.Movies.Update(movie);
        Context.SaveChanges();
        return RedirectToAction("Index", "Home");
    }

    [HttpDelete]
    public void Delete(int movieId)
    {
        Context.Movies.Remove(Context.Movies.Find(movieId));
        Context.SaveChanges();
    }
}
