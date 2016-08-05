// ***********************************************************************
// Assembly         : Hermes.WebApi.Web
// Author           : avinash.dubey
// Created          : 01-19-2016
//
// Last Modified By : avinash.dubey
// Last Modified On : 01-19-2016
// ***********************************************************************
// <copyright file="WebApiConfig.cs" company="">
//     Copyright ©  2015
// </copyright>
// <summary>This file is responsible for the API configuration.</summary>
// ***********************************************************************
using System.Web.Http;
using Hermes.WebApi.Core.Filters;
using Hermes.WebApi.Extensions;
using Hermes.WebApi.Core.Exceptions;

namespace Hermes.WebApi.Web
{
    /// <summary>
    /// This class provides the configuration for the web API.
    /// </summary>
    public static class WebApiConfig
    {
        /// <summary>
        /// Registers the specified configuration of web API.
        /// </summary>
        /// <param name="config">The configuration.</param>
        public static void Register(HttpConfiguration config)
        {
            SimplexConfiguration.Configure(config, Core.Enums.RoutingConfig.Default);
            config.Filters.Add(new ValidateModelAttribute());
        }
    }
}