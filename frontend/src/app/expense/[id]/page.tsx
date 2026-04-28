import { notFound } from "next/navigation";
import Backbutton from "@/app/component/Backbutton";
import Image from "next/image";

interface ExpenseList {
  id: number;
  name: string;
  amount: number;
  date: string;
  category_name: string;
  image: string | null;
  description: string;
}

interface Props {
  params: Promise<{ id: string }>; 
}

async function getData(id: string): Promise<ExpenseList | null> {
  try {
    const res = await fetch(`https://expence-tracker-9rco.onrender.com/expenses/${id}`, {
      cache: 'no-store'
    });

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
    return <p className="text-center mt-10">Invalid ID</p>;
  }

  const expense = await getData(id);

  if (!expense) {
    notFound();
  }

  return (
    // Added p-4 to the main wrapper to ensure the card never touches the very edges of the screen
    <div className="min-h-screen flex justify-center items-center p-4">
      
      {/* CHANGED: Replaced w-1/2 with w-full max-w-2xl md:w-1/2. Added more padding (p-6) */}
      <div className="bg-[#3c3d37] text-[#ECDFCC] rounded-xl h-auto p-6 w-full max-w-2xl md:w-1/2 shadow-lg">
     
        <h1 className="text-2xl font-bold mb-6 text-center pb-4 border-b-2 border-[#697565] tracking-wider">
          {expense.name}
        </h1>
        
        <ul className="flex flex-col gap-6">
          {/* CHANGED: Made the text layout slightly more flexible so it wraps nicely on tiny screens */}
          <li className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-4">
            <strong className="w-full sm:w-1/3 text-gray-300">Amount:</strong> 
            <span className="w-full sm:w-2/3 font-semibold text-lg text-[#ECDFCC]">₹{expense.amount}</span>
          </li>
          
          <li className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-4">
            <strong className="w-full sm:w-1/3 text-gray-300">Date:</strong> 
            <span className="w-full sm:w-2/3">{expense.date}</span>
          </li>
          
          <li className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-4">
            <strong className="w-full sm:w-1/3 text-gray-300">Category:</strong> 
            <span className="w-full sm:w-2/3">{expense.category_name}</span>
          </li>
          
          <li className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-4">
            <strong className="w-full sm:w-1/3 text-gray-300">Description:</strong> 
            <span className="w-full sm:w-2/3 text-gray-200">{expense.description}</span>
          </li>

          {expense.image && (
            <li className="flex justify-center mt-4">
              {/* CHANGED: Added w-full h-auto to make the image scale responsively */}
              <Image 
                src={expense.image} 
                alt={expense.name} 
                width={400}   
                height={300} 
                className="w-full max-w-sm h-auto rounded object-cover border border-[#697565]/30 shadow-md" 
              />
            </li>
          )}
          
          <div className="mt-4 flex justify-center sm:justify-start">
            <Backbutton/>
          </div>
        </ul>
      </div>
    </div>
  );
}