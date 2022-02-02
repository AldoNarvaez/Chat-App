const { createProxyMiddleware } = require("http-proxy-middleware");
//const { application: Express } = require("express");

//  @param {Express} app 
 
module.exports = function (app) {
    app.use(
        "/graphql/",
        createProxyMiddleware({
            target: "http://localhost:3200",
            changeOrigin: true,
            pathRewrite: {
                "^/graphql": "/"
            },
        }),
    );
    app.use(
        "/graphql2/",
        createProxyMiddleware({
            target: "http://localhost:3300",
            changeOrigin: true,
            pathRewrite: {
                "^/graphql2": "/"
            },
        }),
    );
    
    app.use(
        "/mysocket",
        createProxyMiddleware({
            target: "http://localhost:5000",
            // changeOrigin: true,
            ws:true,
            // ,pathRewrite: {
            //     "^/mysocket": "/"
            // }
        })
    )
    
}