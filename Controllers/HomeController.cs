// Copyright (c) 2023 Conrad Hale

using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MovieList.Models;

namespace MovieList.Controllers;

public class HomeController : Controller
{
    private readonly MovieListContext Context;

    public HomeController(MovieListContext context) =>
        Context = context;

    public IActionResult Index() =>
        View(Context.Movies.OrderBy(m => m.Name).ToList());

    public IActionResult Privacy() => View();

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error(int? statusCode) =>
        View(new ErrorViewModel(Activity.Current?.Id ?? HttpContext.TraceIdentifier, statusCode));
}
