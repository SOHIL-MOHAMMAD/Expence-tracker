import { notFound } from "next/navigation";
import Backbutton from "@/app/component/Backbutton";
import Image from "next/image";
interface ExpenseList { // Fixed typo from 'ExpenceList'
  id: number;
  name: string;
  amount: number;
  date: string;
  category_name: string;
  image: string | null; // Account for expenses without an image
  description: string;
}

interface Props {
  // Updated for Next.js 15 where params must be awaited
  params: Promise<{ id: string }>; 
}

async function getData(id: string): Promise<ExpenseList | null> {
  try {
    const res = await fetch(`https://expence-tracker-9rco.onrender.com/expenses/${id}`, {
      cache: 'no-store'
    });

    console.log("status: ", res.status);

    if (!res.ok) return null;

    return res.json();
  } catch (err) {
    console.error('Something went wrong: ', err);
    return null;
  }
}

export default async function ExpenseInfo({ params }: Props) {
  const { id } = await params;

  if (isNaN(Number(id))) {
    return <p>Invalid ID</p>;
  }

  const expense = await getData(id);

  if (!expense) {
    notFound();
  }

  return (
    <div className="min-h-screen flex justify-center items-center ">
     <div className="bg-[#3c3d37] text-[#ECDFCC] rounded-xl h-auto py-5 px-2 w-1/2">
    
       <h1 className="text-2xl font-bold mb-4 text-center py-4 border-b-2 tracking-wider">{expense.name}</h1>
      <ul className="flex flex-col gap-6">
        <li className="flex justify-between px-2"><strong className="flex justify-start w-1/2">Amount:</strong> <span className="flex justify-start w-1/2">{expense.amount}</span></li>
        <li className="flex justify-between px-2"><strong className="flex justify-start w-1/2">Date:</strong> <span className="flex justify-start w-1/2">{expense.date}</span></li>
        <li className="flex justify-between px-2"><strong className="flex justify-start w-1/2">Category:</strong> <span className="flex justify-start w-1/2">{expense.category_name}</span></li>
        <li className="flex justify-between px-2"><strong className="flex justify-start w-1/2">Description:</strong> <span className="flex justify-start w-1/2">{expense.description}</span></li>
        {expense.image && (
          <li>
            <Image src={expense.image} 
              alt={expense.name} 
              width={400}   
              height={300} 
              className="max-w-sm rounded object-cover" />
          </li>
        )}
        <Backbutton/>
      </ul>
     </div>
    </div>
  );
}