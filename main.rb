require 'sinatra'
require 'haml'

get '/' do
  haml :hello
end

get '/:name' do |name|
  @name = name
  haml :chart
end
