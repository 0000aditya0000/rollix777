{/* Menu Items */}
<div className="space-y-3">
  {[
    { title: 'Subordinate data', icon: '👥', route: '/subordinate-data' },
    { title: 'Commission detail', icon: '💰', route: '/commission-detail' },
    { title: 'Invitation rules', icon: '📜', route: '/invitation-rules' },
    { title: 'Agent line customer service', icon: '🎮', route: '/agent-support' }
  ].map((item, index) => (
    <Link
      key={index}
      to={item.route}
      className="block bg-gradient-to-br from-[#252547] to-[#1A1A2E] rounded-lg border border-purple-500/20"
    >
      <div className="p-4 flex items-center justify-between hover:bg-purple-500/10 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
            <span className="text-xl">{item.icon}</span>
          </div>
          <span className="text-white text-sm font-medium">{item.title}</span>
        </div>
        <span className="text-gray-400 text-lg">›</span>
      </div>
    </Link>
  ))}
</div> 