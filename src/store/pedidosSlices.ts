import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state

type ItemType = {
    item: string;
    pedido: number;
    nivelPrioridade: 'Alto' | 'Médio' | 'Baixo';
    precoBase: number;
    unidade: string;
    custoTotal: number;
    custoTotalParcial: number;
    qtdComprada: number;
    concluida: boolean;
    fornecedor: String
}

export interface PedidoState {
    solicitante: string;
    obra: number;
    pedido: string;
    data: string;
    isPedding: boolean;
    totalAmount: number;
    id: number;

    items: ItemType[]
}

type PedidoType = {
    pedidos: PedidoState[]
}

// Initial state
const initialState: PedidoType = {
    pedidos: [],
};

// Actual Slice
export const pedidoSlice = createSlice({
    name: "pedido",
    initialState,
    reducers: {

        // Action to set the authentication status

        addPedido(state, action) {
            state.pedidos.push(action.payload);
        },
        addItem(state, action) {

            const index = state.pedidos.findIndex(pedido => pedido.id === action.payload.id)
            state.pedidos[index].items.push(action.payload)

        },
        removePedido(state, action) {

            const index = state.pedidos.findIndex(pedido => pedido.id === action.payload.id)

            state.pedidos.splice(index, 1)
        },

        incrementItem(state, action) {

            //  Object.assign({}, action.payload, {})

            const index = state.pedidos.findIndex(pedido => pedido.id === action.payload.id)
            let qtd = 0;

            qtd = (action.payload.qtdComprada + 1) * Number(action.payload.precoBase)

            const itemIndex = state.pedidos[index].items.findIndex(item => item.item.toLowerCase() === action.payload.item.toLowerCase())

            state.pedidos[index].items.splice(itemIndex, 1, Object.assign({}, action.payload, { qtdComprada: action.payload.qtdComprada + 1, custoTotalParcial: qtd }))


        },
        decrementItem(state, action) {
            //  Object.assign({}, action.payload, {})

            const index = state.pedidos.findIndex(pedido => pedido.id === action.payload.id)
            let qtd = 0;

            qtd = action.payload.custoTotalParcial - Number(action.payload.precoBase)

            const itemIndex = state.pedidos[index].items.findIndex(item => item.item.toLowerCase() === action.payload.item.toLowerCase())
            state.pedidos[index].items.splice(itemIndex, 1, Object.assign({}, action.payload, { qtdComprada: action.payload.qtdComprada - 1, custoTotalParcial: qtd }))



        }

    },


});

export const { addPedido, addItem, removePedido, incrementItem, decrementItem } = pedidoSlice.actions;

export const selectPedidoState = (state: RootState) => state.combineReducer.pedidoSlice;

export default pedidoSlice.reducer;