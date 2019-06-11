Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty32"

  config.vm.network "forwarded_port", guest: 8000, host: 8000

  # node debug port
  config.vm.network "forwarded_port", guest: 5858, host: 5858

  # MySQL port
  config.vm.network "forwarded_port", guest: 3306, host: 3309

  config.vm.provision "fix-no-tty", type: "shell" do |s|
      s.privileged = false
      s.inline = "sudo sed -i '/tty/!s/mesg n/tty -s \\&\\& mesg n/' /root/.profile"
  end

  config.vm.provision :shell, :path => "config/provision.sh"
  config.vm.provision :shell, :path => "config/install-node.sh", privileged: false
  config.vm.provision :shell, path: "config/install-mysql.sh", privileged: false
  config.vm.provision :shell, :path => "config/env.sh"
end
