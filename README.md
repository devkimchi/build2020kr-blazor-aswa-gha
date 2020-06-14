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

1. Rename `local.settings.sample.json` to `local.settings.json`.
2. Run the app.

    ```bash
    func start --script-root src/Demo.FunctionApp
    ```

3. Open a web browser and enter one of the following URLs.

    ```txt
    https://localhost:7071/api/hello
    https://localhost:7071/api/hello?count=123
    https://localhost:7071/api/hello?count=xxx
    ```

### Blazor Web Assembly API App &ndash; Another Function App ###

This "another" function app works as like an API of Blazor Web Assembly app on Azure Static Web App.

1. Rename `local.settings.sample.json` to `local.settings.json`.
2. Run the app with a different port. eg) 7072

    ```bash
    func start --port 7072 --script-root src/Demo.BlazorApp.Api
    ```

3. Open a web browser and enter one of the following URLs.

    ```txt
    https://localhost:7072/api/hello
    https://localhost:7072/api/hello?count=123
    https://localhost:7072/api/hello?count=xxx
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

In order to deploy the Function app, it is assumed to have the following instances on Azure prior to the deployment:

* [Azure Storage Account](https://docs.microsoft.com/azure/storage/common/storage-account-overview?WT.mc_id=build2020kr-github-juyoo)
* [Consumption Plan](https://docs.microsoft.com/azure/azure-functions/functions-scale?WT.mc_id=build2020kr-github-juyoo#consumption-plan)
* [Azure Functions App](https://docs.microsoft.com/azure/azure-functions/functions-overview?WT.mc_id=build2020kr-github-juyoo)
* [Azure Application Insights (optional)](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview?WT.mc_id=build2020kr-github-juyoo)

Once all the resources are provisioned on Azure, run the following commands in order.

1. Publish Function app.

    ```bash
    dotnet publish src/Demo.FunctionApp -c Release -o funcapp
    ```

2. Zip the published artifact.

    ```bash
    zip funcapp.zip funcapp/
    ```

3. Deploy artifact to Azure.

    ```bash
    az login
    az functionapp deployment source config-zip -g <resource_group> -n <app_name> --src funcapp.zip
    ```

4. Open a web browser and enter one of the following URLs.

    ```txt
    https://<function_app_name>.azurewebsites.net/api/hello?code=<function_auth_key>
    https://<function_app_name>.azurewebsites.net/api/hello?count=123&code=<function_auth_key>
    https://<function_app_name>.azurewebsites.net/api/hello?count=xxx&code=<function_auth_key>
    ```


### Deploy Blazor Web Assembly App to Azure Static Web Apps ###

1. Add secrets to GitHub repository settings:
   * `FUNCTIONAPP_BASE_URI`: Azure Function app base URI. eg) `/api/`
   * `FUNCTIONAPP_ENDPOINT`: Endpoint. eg) `hello`

2. Create Azure Static Web App instance on Azure Portal.
3. When prompted, link to GitHub repository.
4. Deployment will fail. Don't worry! It's expected.
5. Update GitHub Actions workflow.
   * Add the following three steps right after the `checkout@v2` action.

      ```yaml
      - name: Setup .NET SDK
        uses: actions/setup-dotnet@v1
        with:
          dotnet-version: '3.1.300'
      - name: Update appsettings.json
        shell: bash
        run: |
          echo '{ "FUNCTIONAPP_BASE_URI": "${{ secrets.FUNCTIONAPP_BASE_URI }}", "FUNCTIONAPP_ENDPOINT": "${{ secrets.FUNCTIONAPP_ENDPOINT }}" }' > src/Demo.BlazorApp/wwwroot/appsettings.json
      - name: Publish Blazor WASM app
        shell: bash
        run: |
          dotnet publish src/Demo.BlazorApp -c Release -o published
      ```

   * Change the `app_location` and `api_location` and `api_artifact_location` below:

      ```yaml
      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v0.0.1-preview
        with:
          ...
          app_location: "published/wwwroot"
          api_location: "src/Demo.BlazorApp.Api"
          app_artifact_location: "published/wwwroot"
      ```

6. Push the workflow and GitHub Action will run again, and deployment will succeed.
7. Add environment variables to the `Configuration` blade of the Azure Static Web App instance.
   * `FUNCTIONAPP_BASE_URI`: Azure Function app base URI. eg) `https://<function_app_name>.azurewebsites.net/api/`
   * `FUNCTIONAPP_ENDPOINT`: Endpoint. eg) `hello`
   * `FUNCTIONAPP_AUTH_KEY`: Function app auth key.

8. Open a web browser and enter the URL.

    ```txt
    https://<random_string>.azurestaticapps.net
    ```

9. Nagivate the `Counter` page anc click the `Click me` button.


## Update GitHub Actions for ChatOps ##

In order to enable ChatOps demo, follow the instruction to update GitHub Actions workflow.


### Update Existing Workflow ###

1. Add secrets to GitHub repository settings:
   * `STATIC_WEBAPP_URI`: Azure Static Web App instance URI. eg) `https://<random_string>.azurestaticapps.net`
   * `TEAMS_WEBHOOK_URI`: Microsoft Teams webhook URI. eg) `https://outlook.office.com/webhook/<GUID>/IncomingWebhook/<GUID>`

2. Add a new step to the right after the `Build And Deploy` step of the existing workflow. Its filename might look like `azure-static-web-apps-<random_string>.yml`.

    ```yaml
      - name: Send a message to Microsoft Teams
        uses: aliencube/microsoft-teams-actions@v0.8.0
        with:
          webhook_uri: ${{ secrets.TEAMS_WEBHOOK_URI }}
          title: ''
          summary: 'Your Blazor Web Assembly app has been successfully deployed'
          text: ''
          theme_color: ''
          sections: '[{ "activityImage": "https://raw.githubusercontent.com/justinyoo/build2020kr-blazor-aswa-gha/master/media/aswa-icon.png", "activityTitle": "Your Blazor Web Assembly app has been successfully deployed" }]'
          actions: '[{ "@type": "OpenUri", "name": "Go to the web app", "targets": [{ "os": "default", "uri": "${{ secrets.STATIC_WEBAPP_URI }}" }] }]'  
    ```

3. Open the Microsoft Teams channel and see whether the message is posted or not.

