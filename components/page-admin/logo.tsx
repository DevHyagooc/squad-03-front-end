interface LogoProps {
  className?: string
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="getinfo-logo">
        getinfo<span>&lt;/&gt;</span>
      </div>
    </div>
  )
}
