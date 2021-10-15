const app = require('express')()
const db = require('./db.json')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/users", (req, res) => {
    res.send(200, db)
})
app.get("/users/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.send(400, {
            message: 'islenemeyen veri'
        })
    } else {
        const user = db.find(u => u.id == req.params.id)
        if (user) {
            res.send(200, user)
        } else {
            res.send(404, {
                message: 'Kullanici bulunamadi'
            })
        }
    }
})
app.post("/users", (req, res) => {
    const willSaveData ={
        id: new Date().getTime(),
        full_name: req.body.full_name,
        country: req.body.country,
        email: req.body.email,
        created_at: new Date(),
    }
    db.push(willSaveData)
    res.send(willSaveData)
})
app.patch("/users/:id", (req, res) => { 
        if (isNaN(req.params.id)) {
            res.send(400, {
                message: 'islenemeyen veri'
            })
        } else {
            const user = db.find(u => u.id == req.params.id)
            if (user) {
                // Kayit degisikligi
                //pass by reference
                // pass by value
                Object.keys(req.body).forEach(key=>{
                    user[key]= req.body[key]
                })
                res.send(200, user)
            } else {
                res.send(404, {
                    message: 'Kullanici bulunamadi'
                })
            }
        }
    })
app.delete("/users/:id", (req, res) => { 
    if (isNaN(req.params.id)) {
        res.send(400, {
            message: 'islenemeyen veri'
        })
    } else {
        const userIndex = db.findIndex(u => u.id == req.params.id)
        if (userIndex>-1) {
            db.splice(userIndex,1)
            res.send(201,{
                message:'Kullanici silindi'
            } )
        } else {
            res.send(404, {
                message: 'Kullanici bulunamadi'
            })
        }
    }
})
app.listen(process.env.PORT || 3000, () => {
    console.log('sunucu ayaktadir. calisiyor')
})