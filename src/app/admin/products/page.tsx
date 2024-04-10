import Pagination from '@/components/layout/AdminComponents/Pagination';
import SearchBar from '@/components/layout/AdminComponents/SearchBar';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const products = [
  {id: 1, title: "Samsung Galaxy Tab Pro 10.1 LTE", description: "Pre-emptive stable artificial intelligence", createdAt: "21-Mar-2024", price: 17724, image: "https://images.unsplash.com/photo-1646723907212-a61af18b6884?q=80&w=3260&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  {id: 2, title: "alcatel OT-690", description: "Vision-oriented reciprocal utilisation", createdAt: "18-Feb-2024", price: 47205, image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=3330&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  {id: 3, title: "Nokia 3220", description: "Compatible hybrid matrices", createdAt: "05-Jan-2024", price: 41869, image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  {id: 4, title: "Samsung C160", description: "Cross-group 3rd generation migration", createdAt: "12-Mar-2024", price: 24220, image: "https://images.unsplash.com/photo-1558965509-228052befa6b?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  {id: 5, title: "Motorola ATRIX HD MB886", description: "Function-based intangible matrix", createdAt: "07-Mar-2024", price: 5987, image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=3282&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  {id: 6, title: "Plum Flipper", description: "Monitored explicit strategy", createdAt: "27-Feb-2024", price: 36748, image: "https://images.unsplash.com/photo-1557180295-76eee20ae8aa?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  {id: 7, title: "Energizer Energy 500", description: "Seamless uniform throughput", createdAt: "17-Jan-2024", price: 30276, image: "https://images.unsplash.com/photo-1520923642038-b4259acecbd7?q=80&w=3438&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  {id: 8, title: "Spice Mi-496 Spice Coolpad 2", description: "Intuitive 6th generation Graphical User Interface", createdAt: "02-Jan-2024", price: 23149, image: "https://images.unsplash.com/photo-1579607269034-ea6ff32bf848?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  {id: 9, title: "Karbonn K707 Spy II", description: "Visionary modular middleware", createdAt: "07-Mar-2024", price: 17008, image: "https://images.unsplash.com/photo-1522435106575-43e0ff64fb02?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  {id: 10, title: "Pantech Vega Racer 2 IM-A830L", description: "Visionary secondary infrastructure", createdAt: "25-Feb-2024", price: 34518, image: "https://images.unsplash.com/photo-1560268744-aaab797cdfc4?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
];


export default function ProductsPage() {
  return (
    <div className=" bg-accent p-4 rounded-xl">
      <div className="flex justify-between items-center mb-8">
        <SearchBar placeholder='Search products' />
        <Link href={'/admin/products/add'} className='border rounded-xl bg-slate-800 text-white px-3 py-2'>Add New</Link>
      </div>
      <table className='w-full mb-5'>
        <thead>
          <td className='p-3'>Title</td>
          <td className='p-3'>Description</td>
          <td className='p-3'>Price</td>
          <td className='p-3'>Created At</td>
          <td className='p-3'>Stock</td>
          <td className='p-3'>Action</td>
        </thead>
        <tbody>
          {
            products.map(product => (
              <tr key={product.id}>
                <td className='p-3'>
                  <div className="flex gap-2 items-center">
                    <Image
                      src={product.image}
                      alt='avatar'
                      width={40}
                      height={40}
                      className='rounded-full h-10 w-10 object-cover'
                    />
                    {product.title}
                  </div>
                </td>
                <td className='p-3'>
                  {product.description}
                </td>
                <td className='p-3'>
                  {product.price.toLocaleString()}
                </td>
                <td className='p-3'>
                  {product.createdAt}
                </td>
                <td className='p-3'>{'user.status'}</td>
                <td className='p-3'>
                  <div className="flex gap-3">
                    <Link href='' className='py-2 px-3 rounded-lg   bg-slate-800 text-white'>View</Link>
                    <Link href='' className='py-2 px-3 rounded-lg bg-red-500 text-white'>Delete</Link>
                  </div>
                </td>
              </tr>
            ))
          }

        </tbody>
      </table>
      <Pagination />
    </div>
  );
}
