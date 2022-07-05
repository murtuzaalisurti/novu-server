const app = require('express')()
require('dotenv').config()
const { Novu } = require('@novu/node')

const novu = new Novu(process.env.NOVU_API_KEY)

app.post('/addsubs', async (req, res) => {
    try {
        await novu.subscribers.identify('unique_id', {
            email: 'example@hey.com',
            firstName: 'name'
        })
        res.status(200).json({success: true})
    } catch (error) {
        res.status(500).json({err: error})
    }
})

app.get('/trigger', async (req, res) => {
    try {
        await novu.trigger('notification_name', {
            to: {
                subscriberId: 'subscriber_id',
            },
            payload: {
                title: 'This is a notification',
                subtitle: 'hey there!'
            }
        })
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ err: error })        
    }
})

app.listen(process.env.PORT, () => console.log('server running..'))