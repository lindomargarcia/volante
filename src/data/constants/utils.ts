import { STATUS_SERVICE_ORDER } from "@/pages/ServiceOrder/types";

export const SO_STATUS_LIST: {value: STATUS_SERVICE_ORDER, label: string, color: string, linked?: STATUS_SERVICE_ORDER[]}[] = [
    {
        value: STATUS_SERVICE_ORDER.PENDING,
        label: 'Em aberto',
        color: 'bg-zinc-400',
        linked: [STATUS_SERVICE_ORDER.WAITING_APPROVAL, STATUS_SERVICE_ORDER.SCHEDULED, STATUS_SERVICE_ORDER.REJECTED]
    },{
        value: STATUS_SERVICE_ORDER.WAITING_APPROVAL,
        label: 'Enviado ao cliente',
        color: 'bg-violet-500',
        linked: [STATUS_SERVICE_ORDER.APPROVED, STATUS_SERVICE_ORDER.REJECTED]
    },{
        value: STATUS_SERVICE_ORDER.APPROVED,
        label: 'Aprovado',
        color: 'bg-green-600',
        linked: [STATUS_SERVICE_ORDER.SCHEDULED, STATUS_SERVICE_ORDER.DOING]
    },{
        value: STATUS_SERVICE_ORDER.SCHEDULED,
        label: 'Agendado',
        color: 'bg-violet-500',
        linked: [STATUS_SERVICE_ORDER.TODO, STATUS_SERVICE_ORDER.DOING, STATUS_SERVICE_ORDER.READY, STATUS_SERVICE_ORDER.BLOCKED, STATUS_SERVICE_ORDER.DONE]
    },{
        value: STATUS_SERVICE_ORDER.TODO,
        label: 'Estacionado',
        color: 'bg-orange-400',
        linked: [STATUS_SERVICE_ORDER.DOING, STATUS_SERVICE_ORDER.READY, STATUS_SERVICE_ORDER.BLOCKED, STATUS_SERVICE_ORDER.DONE]
    },{
        value: STATUS_SERVICE_ORDER.DOING,
        label: 'Executando',
        color: 'bg-sky-500',
        linked: [STATUS_SERVICE_ORDER.TODO, STATUS_SERVICE_ORDER.READY, STATUS_SERVICE_ORDER.BLOCKED, STATUS_SERVICE_ORDER.DONE]
    },{
        value: STATUS_SERVICE_ORDER.READY,
        label: 'Pronto',
        color: 'bg-green-500',
        linked: [STATUS_SERVICE_ORDER.TODO, STATUS_SERVICE_ORDER.DOING, STATUS_SERVICE_ORDER.BLOCKED, STATUS_SERVICE_ORDER.DONE]
    },{
        value: STATUS_SERVICE_ORDER.DONE,
        label: 'Entregue',
        color: 'bg-zinc-900',
    },{
        value: STATUS_SERVICE_ORDER.BLOCKED,
        label: 'Bloqueado',
        color: 'bg-red-400',
        linked: [STATUS_SERVICE_ORDER.TODO, STATUS_SERVICE_ORDER.DOING, STATUS_SERVICE_ORDER.READY, STATUS_SERVICE_ORDER.DONE]
    },{
        value: STATUS_SERVICE_ORDER.CANCELLED,
        label: 'Cancelado',
        color: 'bg-red-500'
    },{
        value: STATUS_SERVICE_ORDER.REJECTED,
        label: 'Rejeitado',
        color: 'bg-zinc-400',
        linked: [STATUS_SERVICE_ORDER.PENDING]
    }
]


