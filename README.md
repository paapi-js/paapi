![😱 ohmyfetch](.github/banner.png)

*Paapi is a wrapper around [Socket.io](https://socket.io) that makes pairing two devices and establishing a connection
very simple*

<br>
<p align="center">
<a href="https://paapi.pnk.network/"><strong>Demo</strong></a>
<strong>|</strong>
<a href="https://www.npmjs.com/package/@paapi/client"><strong>npm package</strong></a>
</p>
<br>

## 🚀 Quick start

Install the package in your project with the package manager of your choice:

```
npm i @paapi/client
```

```
yarn add @paapi/client
```

```
pnpm add @paapi/client
```

Then use it in your modules or with a bundler:

```javascript
import paapi from '@paapi/client'
```

> Paapi will be working out-of-the-box because it uses by default the [demo server](https://paapi.pnk.network) as
> backend. It is strongly advised to [run your own server](#running-your-own-server) for a more reliable experience.

## 🔗 Pairing

You will then need to share an identifier between the two devices you want to pair. This identifier can be shared the
way you want. The most common method is a QR code (see [the demo](https://paapi.pnk.network/))

The pairing is done like that:

```javascript
const link = await paapi().pair('yourId')
```

If you need the server to generate an ID for you, call the `pair` method with no parameters.

```javascript
const link = await paapi().pair('yourId')
link.id // this is the ID the other device will need to know to pair
```

The link is considered paired when both devices have established a connection with the server. You can be notified for
the pairing with the `onPair` method.

```javascript
link.onPair(() => {
    console.log(`The link is now paired with id ${link.id}`)
})
```

## 🔃 Sending data between peers

Under the hood, a `Link` is using Socket.io to transfer data between the server and the clients.

### 📮 Sending data

To send data, use the `emit()` method of the link.

The first parameter is the event name, and the second the data. This can be any javascript data structure.

```javascript
link.emit('myEvent', {
    some: 'data'
})
```

### 📨 Receiving data

To receive data, you have to bind a listener on the event you want to listen to. This is done with the `on()` method.

```javascript
link.on('myEvent', data => {
    console.log(data) // => { some: 'data' }
})
```

# 📝 Documentation
## 🏭 Factory function `paapi()`
The `paapi()` function is used to create a new link.

```javascript
const link = paapi('https://my-server-url/')
```

## 🔗 Complete Link API

The Link object is exposing each method of the Socket.io `Socket` Object.
See [the documentation there](https://socket.io/docs/v4/client-socket-instance/).

### Link-specific API

The Link instance has some additional methods and attributes.

#### Attributes

| Method   | Returns                                                         | Description                                      |
|----------|-----------------------------------------------------------------|--------------------------------------------------|
| `id`     | **string**                                                      | The room id the link is paired with              |
| `paired` | **boolean** *(readonly)*                                        | `true` if the link is paired. `false` otherwise  |
| `socket` | **[Socket](https://socket.io/docs/v4/client-socket-instance/)** | The Socket.io's Socket instance used by the link |


#### Methods

| Method                       | Returns            | Description                                                                                              |
|------------------------------|--------------------|----------------------------------------------------------------------------------------------------------|
| `pair([id: string])`         | **Promise\<Link>** | Pairs the link with the provided room id.<br/>If `id` is not provided, the server will autogenerate one. |
| `onPair(listener: Function)` | `void`             | Registers a listener for when the link will be paired.                                                   |
| `waitFor(event: string)`     | **Promise\<any>**  | Utility method that return a promise that will resolve the next time the specified event is fired.       |

## 📡 Running your own server

> ⏳ *Coming soon !*
