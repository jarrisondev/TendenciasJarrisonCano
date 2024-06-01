import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Order } from './order'
import { IOrder, useDeleteOrder, useFetchOrders } from './services'
import { useFetchPatients } from '../patients/services'
import { useFetchEmployees } from '../employees/services'

export const Orders = () => {
  const fetchList = useFetchOrders()
  const deleteItem = useDeleteOrder()
  const fetchPatient = useFetchPatients()
  const fetchEmployee = useFetchEmployees()
  const [openOrder, setOpenOrder] = useState<IOrder | null>(null)

  const orders = fetchList.data ?? []

  return (
    <div>
      {openOrder ? (
        <Order
          item={openOrder}
          onClose={() => {
            setOpenOrder(null)
            fetchList.refetch()
          }}
        />
      ) : (
        <>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                setOpenOrder({
                  patient: NaN,
                  diagnosticHelpOrder: [],
                  doctor: NaN,
                  createdAt: new Date(),
                  medicineOrder: [],
                  procedureOrder: [],
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
                <TableHead>Doctor</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead># Medicamentos</TableHead>
                <TableHead># Procedimientos</TableHead>
                <TableHead># Ayudas diagnosticas</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{fetchEmployee.data?.find((employee) => employee.id === item.doctor)?.name}</TableCell>
                  <TableCell>{fetchPatient.data?.find((patient) => patient.id === item.patient)?.name}</TableCell>
                  <TableCell>{item.medicineOrder.length}</TableCell>
                  <TableCell>{item.procedureOrder.length}</TableCell>
                  <TableCell>{item.diagnosticHelpOrder.length}</TableCell>

                  <TableCell className="text-right">
                    <Button onClick={() => setOpenOrder(item)}>Editar</Button>
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
