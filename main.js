const fs = require("fs")
const http = require("http")
const axios = require('axios');
const url = require("url")

http
    .createServer((req, res) =>
    {
        const requrl = url.parse(req.url, true);
        if(requrl.pathname.includes("api/proveedores"))
        {
            axios
                .get("https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json")
                .then(({data}) =>
                {
                    fs.readFile("index.html", (err, file) =>
                    {
                        let content = file.toString();
                        content = content.replace("{{TITLE}}", "Listado de proveedores");
                        let table = "";
                        data.forEach((prov) => {table += '<tr> <th>' + prov.idproveedor + '</th> <td>' + prov.nombrecompania + '</td> <td>' + prov.nombrecontacto + '</td> </tr>'});
                        content = content.replace("{{TABLE}}", table);
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.end(content);
                    })
                })
        } else if(requrl.pathname.includes("api/clientes"))
        {
            axios
                .get("https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json")
                .then(({data}) =>
                {
                    fs.readFile("index.html", (err, file) =>
                    {
                        let content = file.toString();
                        content = content.replace("{{TITLE}}", "Listado de clientes");
                        let table = "";
                        data.forEach((cli) => {table += '<tr> <th>' + cli.idCliente + '</th> <td>' + cli.NombreCompania + '</td> <td>' + cli.NombreContacto + '</td> </tr>'});
                        content = content.replace("{{TABLE}}", table);
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.end(content);
                    })
                })
        }
        else
        {
            res.writeHead(404, "Not found.");
            res.end();
        }
    
    })
    .listen(8081)