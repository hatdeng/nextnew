async function test () {
    const Redis = require('ioredis')

    const redis = new Redis({
        port: 6378,
        password: 123456
    })

    await redis.set('c', '1234')
    await redis.setex('d', 10, '1234')
    const keys = await redis.keys('*')
    console.log(await redis.get('b'))
}


test ()
