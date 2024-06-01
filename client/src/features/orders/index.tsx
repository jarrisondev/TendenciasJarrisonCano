import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState } from 'react'
import { FileDown, Plus } from 'lucide-react'
import { Order } from './order'
import { IOrder, useDeleteOrder, useFetchOrders } from './services'
import { useFetchPatients } from '../patients/services'
import { useFetchEmployees } from '../employees/services'
import Exceljs from 'exceljs'
import { useFetchMedicines } from '../medicines/services'

export const Orders = () => {
  const fetchList = useFetchOrders()
  const deleteItem = useDeleteOrder()
  const fetchPatient = useFetchPatients()
  const fetchEmployee = useFetchEmployees()
  const [openOrder, setOpenOrder] = useState<IOrder | null>(null)

  const medicines = useFetchMedicines()

  const orders = fetchList.data ?? []

  const handleExportExcel = (order: IOrder) => {
    const workbook = new Exceljs.Workbook()
    const worksheet = workbook.addWorksheet('Orden')

    worksheet.getColumn('A').width = 30
    worksheet.addRow(['Doctor:', fetchEmployee.data?.find((employee) => employee.id === order.doctor)?.name])
    worksheet.addRow(['Paciente:', fetchPatient.data?.find((patient) => patient.id === order.patient)?.name])
    worksheet.addRow(['Fecha de creación:', new Date(order.createdAt).toLocaleDateString()])
    worksheet.addRow([' '])

    worksheet.addRow(['Medicamentos']).font = { bold: true }
    worksheet.addRow(['Nombre', 'Precio', 'Cantidad']).font = { bold: true }
    order.medicineOrder.forEach((item) => {
      const medicine = medicines.data?.find((medicine) => medicine.id === item.medicine)
      worksheet.addRow([medicine?.name, medicine?.price, item.quantity])
    })
    worksheet.addRow([' '])

    worksheet.addRow(['Procedimientos']).font = { bold: true }
    worksheet.addRow(['Nombre', 'Precio', 'Cantidad', 'Requiere asistencia']).font = { bold: true }
    order.procedureOrder.forEach((item) => {
      worksheet.addRow([item.name, item.price, item.quantity, item.requireAssistance ? 'Si' : 'No'])
    })
    worksheet.addRow([' '])

    worksheet.addRow(['Ayudas diagnosticas']).font = { bold: true }
    worksheet.addRow(['Nombre', 'Precio', 'Cantidad', 'Requiere asistencia']).font = { bold: true }
    order.diagnosticHelpOrder.forEach((item) => {
      worksheet.addRow([item.name, item.price, item.quantity, item.requireAssistance ? 'Si' : 'No'])
    })

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'orden.xlsx'
      a.click()
      URL.revokeObjectURL(url)
    })
  }

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

                  <TableCell className="flex justify-end">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => {
                        handleExportExcel(item)
                      }}
                    >
                      <FileDown size={16} />
                    </Button>
                    <Button className="ml-2" onClick={() => setOpenOrder(item)}>
                      Editar
                    </Button>
                    <Button
                      className="ml-2"
                      onClick={() => {
                        if (item?.id) {
                          deleteItem.mutateAsync(item?.id).then(() => {
                            fetchList.refetch()
                          })
                        }
                      }}
                      variant={'destructive'}
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
