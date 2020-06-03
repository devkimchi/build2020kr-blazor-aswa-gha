# Build 2020 Korea &ndash; Blazor Web Assembly, Fluent UI, Azure Functions, Azure Static Web Apps and GitHub Actions Demo #

This is to provide a sample codes for the end-to-end app development story covering Blazor Web Assembly, Fluent UI, Azure Functions, Azure Static Web Apps and GitHub Actions


## Prerequisites ##

* [.NET Core SDK 3.1.4 or later](https://dotnet.microsoft.com/download/dotnet-core/3.1?WT.mc_id=build2020kr-github-juyoo#3.1.4)
* [node.js 12.13.0 or later](https://nodejs.org/en/download/)


## Getting Started ##

First of all, clone this repo onto your local dev machine.

```bash
git clone https://github.com/justinyoo/build2020kr-blazor-aswa-gha.git
```

Then change the directory to the cloned one.

```bash
cd build2020kr-blazor-aswa-gha
```


### Blazor Web Assembly Web App ###

1. Build the app.

   ```bash
   dotnet build Build2020Demo.sln
   ```

2. Run the app.

   ```bash
   dotnet run -p src/Blazor.WebAssemblyApp
   ```

3. Open a web browser and enter the URL.

   ```txt
   https://localhost:5001
   ```
