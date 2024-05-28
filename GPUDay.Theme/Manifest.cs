using Lombiq.Hosting.MediaTheme.Bridge.Constants;
using OrchardCore.DisplayManagement.Manifest;

[assembly: Theme(
    Name = "GPUDay.Theme",
    Author = "Lombiq Technologies",
    Website = "https://orchardcore.net",
    Version = "0.0.1",
    Description = "GPUDay.Theme",
    Dependencies =
    [
        FeatureNames.MediaThemeBridge,
    ]
)]
