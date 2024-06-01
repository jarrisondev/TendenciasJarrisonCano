import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState } from 'react'
import { IProcedureOrder, useFetchProceduresOrders, useDeleteProcedureOrder } from './services'
import { Plus } from 'lucide-react'
import { ProcedureOrder } from './procedureOrder'

export const ProceduresOrder = () => {
  const fetchList = useFetchProceduresOrders()
  const deleteItem = useDeleteProcedureOrder()
  const [open, setOpen] = useState<IProcedureOrder | null>(null)

  const items = fetchList.data ?? []

  return (
    <div>
      {open ? (
        <ProcedureOrder
          item={open}
          onClose={() => {
            setOpen(null)
            fetchList.refetch()
          }}
        />
      ) : (
        <>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                setOpen({
                  name: '',
                  price: NaN,
                  order: NaN,
                  quantity: NaN,
                  requireAssistance: false,
                })
              }}
            >
              Crear <Plus size={16} className="ml-2" />
            </Button>
          </div>

          <Table className="mt-20">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead># Orden</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableCell>Requiere asistencia</TableCell>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.order}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-right">{item.price}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell>{item.requireAssistance ? 'Si' : 'No'}</TableCell>
                  <TableCell className="text-right">
                    <Button onClick={() => setOpen(item)}>Editar</Button>
                    <Button
                      className="ml-2 bg-red-500 hover:bg-red-600"
                      onClick={() => {
                        if (item?.id) {
                          deleteItem.mutateAsync(item?.id).then(() => {
                            fetchList.refetch()
                          })
                        }
                      }}
                      variant={'secondary'}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  )
}
