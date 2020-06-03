# Build 2020 Korea &ndash; Blazor Web Assembly, Fluent UI, Azure Functions, Azure Static Web Apps and GitHub Actions Demo #

This is to provide a sample codes for the end-to-end app development story covering Blazor Web Assembly, Fluent UI, Azure Functions, Azure Static Web Apps and GitHub Actions

> <span style="color: red; font-weight: bold; font-size: 18pt;">For Build demo, use the `demo` branch, instead of `master`</span>


## Prerequisites ##

* [.NET Core SDK 3.1.4 or later](https://dotnet.microsoft.com/download/dotnet-core/3.1?WT.mc_id=build2020kr-github-juyoo#3.1.4)
* [node.js 12.13.0 or later](https://nodejs.org/en/download/)
* [Azure Functions Core Tools](https://www.npmjs.com/package/azure-functions-core-tools)
* [Azure Free Account](https://azure.microsoft.com/free/?WT.mc_id=build2020kr-github-juyoo)


## Getting Started ##

First of all, clone this repo onto your local dev machine.

```bash
git clone https://github.com/justinyoo/build2020kr-blazor-aswa-gha.git
```

Then change the directory to the cloned one.

```bash
cd build2020kr-blazor-aswa-gha
```

And finally, build the app.

```bash
dotnet build Build2020Demo.sln
```


### Azure Functions App ###

1. Run the app.

   ```bash
   func host start --script-root src/Demo.FunctionApp/
   ```

2. Open a web browser and enter one of the following URLs.

   ```txt
   https://localhost:7071/api/hello
   https://localhost:7071/api/hello?count=123
   https://localhost:7071/api/hello?count=xxx
   ```


### Blazor Web Assembly App ###

1. Run the app.

   ```bash
   dotnet run -p src/Demo.BlazorApp
   ```

2. Open a web browser and enter the URL.

   ```txt
   https://localhost:5001
   ```

3. Nagivate the `Counter` page anc click the `Click me` button.


## Deploy Applications ##

### Deploy Azure Functions App ###

TBD


### Deploy Blazor Web Assembly App to Azure Static Web Apps ###

TBD


## Update GitHub Actions ##

TBD

