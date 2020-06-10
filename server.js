const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')

const session = require('koa-session')
const Redis = require('ioredis')

const RedisSessionStore = require('./server/session-store')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()


// create redis client
const redis = new Redis()

app.prepare().then(() => {

    const server = new Koa()
    const router = new Router()
    
    server.keys = ['harry develop test appp']

    const SESSION_CONFIG = {
        key: 'eid',
        masAge: 10*1000,
        store: new RedisSessionStore(redis)
    }

    server.use(session(SESSION_CONFIG, server))

    /* server.use((ctx, next) => { 
        if (ctx.cookies.get('eid')) {
            ctx.session = {}
        }

        await next()

        // ctx.session
        // cts.cookies.set()
    })   */
                   
    server.use(async (ctx, next) => {
        //console.log(ctx.cookies.get('id'))

        /* if (!ctx.session.user) {
            ctx.session.user = {
                name: 'Harry',
                age: 18
            } 
        } else {
            console.log('session is', ctx.session._ctx) 
        } */
        await next()
    })

    router.get('/a/:id', async ctx => {
        const id = ctx.params.id
        await handle(ctx.req, ctx.res, {
            pathname: '/a',
            query: { id },
        })

        ctx.respond = false
    })

    router.get('/set/user', async ctx => {
        

        //ctx.respond = false
        ctx.session.user = {
            name: 'Harry',
            age: 18
        } 

        ctx.body = 'set session success '
    })
    router.get('/delete/user', async ctx => {
        

        //ctx.respond = false
        ctx.session = null

        ctx.body = 'remove session success '
    })

    server.use(router.routes())
    server.use(async (ctx, next) => {
        /* ctx.cookies.set('id', 'userid: xxxxxx', {
            httpOnly: false
        }) */
 
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })

    server.listen(3000, () => {
        console.log('koa server listening on 3000')
    })
})
