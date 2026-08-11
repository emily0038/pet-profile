import Image from 'next/image'

export default function ValueCard({
  icon,
  title,
  children,
}: {
  icon: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl p-6 flex gap-4 items-start border border-gray-200" style={{ background: 'linear-gradient(135deg, #F5F3FF 0%, #E4E1FF 100%)' }}>
      <div className="shrink-0 w-10 h-10 relative">
        <Image src={icon} alt="" width={40} height={40} className="w-10 h-10" />
      </div>
      <div>
        <h4 className="text-lg font-bold font-slab text-black mb-1">{title}</h4>
        <p className="text-gray-700 font-flex text-base">{children}</p>
      </div>
    </div>
  )
}
