import { createServer } from 'node:http'
import { root } from "./root.js"
import { about } from "./about.js"
import { contact } from "./contact.js"

const server = createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, {"content-type": "text/html"})
        res.write(root("John Doe"), () => 
            console.log('Hit root'))
        res.end()
    }

    else if (req.url === '/about') {
        res.writeHead(200, {"content-type": "text/html"})
        res.write(about("John Doe"), () => 
            console.log('Hit about'))
        res.end()
    }

    else if (req.url === '/contact') {
        res.writeHead(200, {"content-type": "text/html"})
        res.write(contact("John Doe"), () => 
            console.log('Hit contact'))
        res.end()
    }

    else if (req.url === '/gallery') {
        res.writeHead(200, {"content-type": "text/html"})
        res.end(`
            <h1>Welcome to the Gallery Page</h1>
            <p>Name: Jullian Quiambao</p>
            <p>Date: July 24, 2025</p>
            <p>Section: WD-304</p>
        `)
    }

    else {
        res.writeHead(404, {"content-type": "text/html"})
        res.end(`
            <h1>404, Page not Found</h1>
            <p>Name: Jullian Quiambao</p>
            <p>Date: July 24, 2025</p>
            <p>Section: WD-304</p>
        `)
    }
})

server.listen(8888, 'localhost', () => {
    console.log("Listening on localhost:8888")
})

// Name: Jullian Quiambao
// Date: July 24, 2025
// Section: WD-304
