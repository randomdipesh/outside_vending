import { data,transaction  } from "../apis"
import { Send } from "../helper"

export const getDataService = async ()=>{
    return await Send("GET",data.items)
}

export const purchaseService = async (formData)=>{
    return await Send("POST",transaction.purchase,formData)
}

export const refundService = async (purchaseToken)=>{
    return await Send("GET",`${transaction.refund}/${purchaseToken}`)
}
