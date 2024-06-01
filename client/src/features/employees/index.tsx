import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Employee } from './employee'
import { IEmployee, useDeleteEmployee, useFetchEmployees } from './services'

export const Employees = () => {
  const fetchEmployees = useFetchEmployees()
  const deleteEmployee = useDeleteEmployee()
  const [openEmployee, setOpenEmployee] = useState<IEmployee | null>(null)

  const employees = fetchEmployees.data ?? []

  return (
    <div>
      {openEmployee ? (
        <Employee
          item={openEmployee}
          onClose={() => {
            setOpenEmployee(null)
            fetchEmployees.refetch()
          }}
        />
      ) : (
        <>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                setOpenEmployee({
                  address: '',
                  email: '',
                  birthDate: new Date(),
                  name: '',
                  password: '',
                  phone: '',
                  role: 'Administrative',
                  username: '',
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
                <TableHead>Rol</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell className="text-right">
                    <Button onClick={() => setOpenEmployee(item)}>Editar</Button>
                    <Button
                      className="ml-2 bg-red-500 hover:bg-red-600"
                      onClick={() => {
                        if (item?.id) {
                          deleteEmployee.mutateAsync(item?.id).then(() => {
                            fetchEmployees.refetch()
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
