import NonFungibleToken from "../contracts/NonFungibleToken.cdc"
import BlazinglyFast from "../contracts/BlazinglyFast.cdc"

transaction(){

    prepare(signer:AuthAccount){

        signer.save( <- BlazinglyFast.createEmptyCollection(), to: /storage/myCollection)

        signer.link<&BlazinglyFast.Collection{NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver, BlazinglyFast.CollectionPublic}>(/public/myCollection, target: /storage/myCollection)
                 ?? panic("Nothing to link")
    }
}
