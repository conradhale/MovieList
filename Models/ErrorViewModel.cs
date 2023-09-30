// Copyright (c) 2023 Conrad Hale

namespace MovieList.Models;

public record ErrorViewModel(string RequestId, int? ErrorCode)
{
    public bool ShowRequestId { get; init; } = !string.IsNullOrEmpty(RequestId);
}
