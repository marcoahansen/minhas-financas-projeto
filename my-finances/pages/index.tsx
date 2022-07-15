import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import FinancesTable from "../components/FinancesTable";
import { Heading, useDisclosure } from "@chakra-ui/react";
import NewExpenseModal from "../components/NewExpenseModal";
import { useState, useEffect } from "react";
import { IExpenses } from "../models/IExpense";
import { getExpenses, removeExpense } from "../services/api";

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [expenses, setExpenses] = useState<IExpenses[]>([]);
  const [expenseToEdit, setExpenseToEdit] = useState<IExpenses>();

  const fetchExpenses = () =>
    getExpenses().then(expenseList => setExpenses(expenseList));

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Minhas Finanças</title>
        <meta name="description" content="Vnt 4tech 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Heading as="h2" mb="100px">
          Minhas Finanças
        </Heading>
        <FinancesTable
          expenses={expenses}
          onAddExpense={onOpen}
          onEditExpense={(expense) => {
            setExpenseToEdit(expense);
            onOpen();
          }}
          onRemoveExpense={async (expense) => {
            await removeExpense(expense);
            fetchExpenses();
          }}
        />
        {isOpen ?(
          <NewExpenseModal
            isOpen={isOpen}
            expense={expenseToEdit}
            onSave={()=>{
              fetchExpenses();
              onClose();
              setExpenseToEdit(undefined);
            }}
            onClose={() =>{
              onClose();
              setExpenseToEdit(undefined);
            }}
          />
        ) : null}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.linkedin.com/in/marco-a-hansen/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Desenvolvido por Marco Aurelio no Venturus 4Tech
        </a>
        <a
          href="https://github.com/marcoahansen/minhas-financas-projeto"
          target="_blank"
          rel="noopener noreferrer"
        >
          Repositório do projeto
        </a>
        <a
          href="https://www.venturus.org.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Venturus
        </a>
      </footer>
    </div>
  );
};

export default Home;