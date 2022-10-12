import BlazinglyFast from "../contracts/BlazinglyFast.cdc"

pub fun main(account:Address,id:UInt64){

    let capability = getAccount(account).getCapability(/public/myCollection).borrow<&BlazinglyFast.Collection{BlazinglyFast.CollectionPublic}>()
                                  ?? panic("Couldn't create a link/Couldn't find the resource")


    let data = capability.borrowNFT(id: id)

    log(data)

}

