#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Academy.DataScience.HouseLauncherGateway/Academy.DataScience.HouseLauncherGateway.csproj", "Academy.DataScience.HouseLauncherGateway/"]
RUN dotnet restore "Academy.DataScience.HouseLauncherGateway/Academy.DataScience.HouseLauncherGateway.csproj"
COPY . .
WORKDIR "/src/Academy.DataScience.HouseLauncherGateway"
RUN dotnet build "Academy.DataScience.HouseLauncherGateway.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Academy.DataScience.HouseLauncherGateway.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Academy.DataScience.HouseLauncherGateway.dll", "--server.urls", "http://+:80;https://+:443"]
