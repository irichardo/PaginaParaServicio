const subscriptionType: { [key: number]: { type: number, price: number, name:string } } = {
    0: { type: 0, price: 0, name:"free" },
    1: { type: 1, price: 20, name:"basic" },
    2: { type: 2, price: 40, name:"pro" },
    3: { type: 3, price: 60, name:"advanced" },
}

export default subscriptionType;