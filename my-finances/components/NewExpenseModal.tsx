import { Button, FormControl, FormLabel, Grid, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Spinner, useToast } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useState, ChangeEvent } from "react";
import ICategories from '../models/ICategories';
import { IExpenses } from "../models/IExpense";
import { saveExpense } from "../services/api";

interface Props {
    isOpen: boolean;
    expense?: IExpenses;
    onSave: () => void;
    onClose: () => void;
    categories: ICategories[];
}

function NewExpenseModal({ isOpen, expense, onSave, onClose, categories }: Props) {
    const toast = useToast();
    const [description, setDescription] = useState('');
    const [value, setValue] = useState(1);
    const [category, setCategory] = useState<string>();
    
    const [isLoading, setLoading] = useState(false);

    useEffect (()=>{
        setDescription(expense?.description ?? '')
        setValue(expense?.value ?? 1)
        setCategory(expense?.category);
    },[expense])

  const handleAddExpense = async () => {
    if (!category){
        return;
    }
    const expenseToSave = {
        id: expense?.id,
        description : description,
        value,
        category,
        date: Date.now(),
    };

    setLoading(true);

    await saveExpense(expenseToSave);

    setLoading(false);

    toast({
        title: 'Despesa salva',
        description: 'Despesa foi salva com sucesso',
        status: 'success',
        position: 'top-right'
    })
    
    onSave();
  };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Adicionar Despesa</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Grid
                        templateColumns={"repeat(2, 1fr)"}
                        templateRows={"repeat(2, 1fr)"}
                        gap={4}
                    >
                        <GridItem colSpan={2}>
                            <FormControl>
                                <FormLabel>Descrição</FormLabel>
                                <Input
                                    placeholder="Descrição"
                                    value={description}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem colSpan={1}>
                            <FormControl>
                                <FormLabel htmlFor="value">Valor</FormLabel>
                                <NumberInput 
                                  min={1}
                                  value={String(value).replace('.',',')}
                                  onChange={(_: string, value: number) => setValue(value)}
                                >
                                    <NumberInputField id="value" />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                        </GridItem>

                        <GridItem colSpan={1}>
                            <FormControl>
                                <FormLabel htmlFor="category">Categoria</FormLabel>
                                <Select
                                    id="category"
                                    placeholder="Categoria"
                                    value={category}
                                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                                >
                                  {categories.map(category => (
                                        <option key={category.id} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </GridItem>
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => onClose()} mr={3}>
                        Cancelar
                    </Button>
                    <Button
                        colorScheme="blue"
                        onClick={handleAddExpense}
                        disabled={isLoading}
                    >
                        {expense ? 'Editar' : 'Adicionar'}
                        {isLoading && 
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.300'
                            color='blue.800'
                            size='md'
                            ms={4}
                        />}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export async function getServerSideProps() {
    const response = await axios.get('http://localhost:3000/api/categories');
  
    return {
      props: {
        categories: response.data
      },
    }
}

export default NewExpenseModal;