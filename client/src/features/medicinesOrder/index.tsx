import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState } from 'react'
import { MedicineOrder } from './medicineOrder'
import { IMedicineOrder, useDeleteMedicineOrder, useFetchMedicinesOrders } from './services'
import { useFetchMedicines } from '../medicines/services'
import { Plus } from 'lucide-react'

export const MedicinesOrder = () => {
  const fetchList = useFetchMedicinesOrders()
  const deleteItem = useDeleteMedicineOrder()
  const [openMedicine, setOpenMedicine] = useState<IMedicineOrder | null>(null)

  const medicines = useFetchMedicines().data ?? []

  const items = fetchList.data ?? []

  return (
    <div>
      {openMedicine ? (
        <MedicineOrder
          item={openMedicine}
          onClose={() => {
            setOpenMedicine(null)
            fetchList.refetch()
          }}
        />
      ) : (
        <>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                setOpenMedicine({
                  medicine: NaN,
                  order: NaN,
                  quantity: NaN,
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
                <TableHead>Medicina</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.order}</TableCell>
                  <TableCell>{medicines.find((medicine) => medicine.id === item.medicine)?.name}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    <Button onClick={() => setOpenMedicine(item)}>Editar</Button>
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
