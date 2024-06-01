import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { IPatient, useDeletePatient, useFetchPatients } from './services'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Patient } from './patient'

export const Patients = () => {
  const fetchPatients = useFetchPatients()
  const deletePatient = useDeletePatient()
  const [openPatient, setOpenPatient] = useState<IPatient | null>(null)

  const patients = fetchPatients.data ?? []

  return (
    <div>
      {openPatient ? (
        <Patient
          item={openPatient}
          onClose={() => {
            setOpenPatient(null)
            fetchPatients.refetch()
          }}
        />
      ) : (
        <>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                setOpenPatient({
                  name: '',
                  birthDate: new Date(),
                  phone: '',
                  email: '',
                  address: '',
                  emergencyContactName: '',
                  emergencyContactPhone: '',
                  emergencyContactRelationship: '',
                  gender: '',
                  medicalInsuranceExpirationDate: new Date(),
                  medicalInsuranceName: '',
                  medicalInsuranceNumber: 0,
                  medicalInsuranceStatus: true,
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
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Contacto de emergencia</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>
                    {item.emergencyContactName} - {item.emergencyContactPhone}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button onClick={() => setOpenPatient(item)}>Editar</Button>
                    <Button
                      className="ml-2 bg-red-500 hover:bg-red-600"
                      onClick={() => {
                        if (item?.id) {
                          deletePatient.mutateAsync(item?.id).then(() => {
                            fetchPatients.refetch()
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
