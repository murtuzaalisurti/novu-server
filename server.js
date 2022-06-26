const app = require('express')()
require('dotenv').config()
const { Novu } = require('@novu/node')

const novu = new Novu(process.env.NOVU_API_KEY)

app.post('/addsubs', async (req, res) => {
    const r = await novu.subscribers.identify('murtuza1290', {
        email: 'test123@hey.com',
        firstName: 'Murtuza'
    });
    console.log(r)
    res.json({success: true})
})

app.get('/trigger', async (req, res) => {
    const result = await novu.trigger('take-a-break', {
        to: {
            subscriberId: 'murtuza1290',
        },
        payload: {
            title: 'This is a notification',
            subtitle: 'hey there!'
        }
    });
    console.log(result.data)
    res.status(200).json({ success: true })
})

app.listen(5000, () => console.log('server running..'))