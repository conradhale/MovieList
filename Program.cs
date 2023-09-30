// Copyright (c) 2023 Conrad Hale

using Microsoft.EntityFrameworkCore;
using MovieList.Models;
using Vite.AspNetCore.Extensions;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddViteServices();

builder.Services.AddDbContext<MovieListContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MovieListContext")));

builder.Services.Configure<CookiePolicyOptions>(
    options =>
    {
        options.CheckConsentNeeded = _ => true;
        options.MinimumSameSitePolicy = SameSiteMode.None;
    }
);

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

if (!builder.Environment.IsDevelopment())
{
    builder.Services.AddHttpsRedirection(options =>
        options.RedirectStatusCode = StatusCodes.Status308PermanentRedirect);
}

WebApplication app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}
else
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
    app.UseViteDevMiddleware();
}

app.UseStatusCodePagesWithReExecute("/Home/Error", "?statusCode={0}");

// Create db if it doesn't exist
using (IServiceScope scope = app.Services.CreateScope())
{
    MovieListContext context = scope.ServiceProvider.GetRequiredService<MovieListContext>();
    context.Database.EnsureCreated();
    context.Initialize();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCookiePolicy();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
