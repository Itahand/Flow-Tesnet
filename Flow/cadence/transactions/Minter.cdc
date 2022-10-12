import BlazinglyFast from "../contracts/BlazinglyFast.cdc"

    transaction(recipientAddress:Address){

    prepare(signer:AuthAccount){

        let minter = signer.borrow<&BlazinglyFast.Minter>(from: /storage/Minter) ?? panic("This account is not allowed to Mint or doesn't have the Minter resource")
        let recipientsCollection = getAccount(recipientAddress).getCapability(/public/myCollection).borrow<&BlazinglyFast.Collection{BlazinglyFast.CollectionPublic}>()
                             ?? panic("No public path")

        recipientsCollection.deposit(token: <- minter.createNFT(name: "CryptoFunk",favouriteFood:"Sushi",luckyNumber:55))

        log("A BlazinglyFast NFT has been minted to address: ")
        log(recipientAddress)
    }
    execute{}
}