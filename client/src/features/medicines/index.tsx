import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { IMedicine, useDeleteMedicine, useFetchMedicines } from './services'
import { useState } from 'react'
import { Medicine } from './medicine'

// const invoices = [
//   {
//     invoice: 'INV001',
//     paymentStatus: 'Paid',
//     totalAmount: '$250.00',
//     paymentMethod: 'Credit Card',
//   },
//   {
//     invoice: 'INV002',
//     paymentStatus: 'Pending',
//     totalAmount: '$150.00',
//     paymentMethod: 'PayPal',
//   },
//   {
//     invoice: 'INV003',
//     paymentStatus: 'Unpaid',
//     totalAmount: '$350.00',
//     paymentMethod: 'Bank Transfer',
//   },
//   {
//     invoice: 'INV004',
//     paymentStatus: 'Paid',
//     totalAmount: '$450.00',
//     paymentMethod: 'Credit Card',
//   },
//   {
//     invoice: 'INV005',
//     paymentStatus: 'Paid',
//     totalAmount: '$550.00',
//     paymentMethod: 'PayPal',
//   },
//   {
//     invoice: 'INV006',
//     paymentStatus: 'Pending',
//     totalAmount: '$200.00',
//     paymentMethod: 'Bank Transfer',
//   },
//   {
//     invoice: 'INV007',
//     paymentStatus: 'Unpaid',
//     totalAmount: '$300.00',
//     paymentMethod: 'Credit Card',
//   },
// ]
export const Medicines = () => {
  const fetchMedicines = useFetchMedicines()
  const deleteMedicine = useDeleteMedicine()
  const [openMedicine, setOpenMedicine] = useState<IMedicine | null>(null)

  const medicines = fetchMedicines.data ?? []

  return (
    <div>
      {openMedicine ? (
        <Medicine
          medicine={openMedicine}
          onClose={() => {
            setOpenMedicine(null)
            fetchMedicines.refetch()
          }}
        />
      ) : (
        <>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                setOpenMedicine({
                  name: '',
                  price: 1,
                  quantity: 1,
                })
              }}
            >
              Crear medicamento
            </Button>
          </div>

          <Table className="mt-20">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicines.map((medicine) => (
                <TableRow key={medicine.id}>
                  <TableCell className="font-medium">{medicine.id}</TableCell>
                  <TableCell>{medicine.name}</TableCell>
                  <TableCell>{medicine.price}</TableCell>
                  <TableCell className="text-right">{medicine.quantity}</TableCell>
                  <TableCell className="text-right">
                    <Button onClick={() => setOpenMedicine(medicine)}>Editar</Button>
                    <Button
                      className="ml-2 bg-red-500 hover:bg-red-600"
                      onClick={() => {
                        if (medicine?.id) {
                          deleteMedicine.mutateAsync(medicine?.id).then(() => {
                            fetchMedicines.refetch()
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
