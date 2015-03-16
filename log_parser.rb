require 'git'
require 'json'
require 'active_support'
require 'active_support/core_ext'

#@name set by controller (main.rb)

def log
  max = 10000
  Git.open("../#{@name}", {}).log(max).since('16 weeks ago')
end

def merges
  log.select { |commit| commit.message.start_with? 'Merge' }
end

def cleaned
  @cleaned ||= merges.reverse.map do |commit|
    next unless commit.message[/\n\n/]  # no original message
    [commit.date, commit.message.match('Merge.*\n\n(.*)').captures.first]
  end.compact
end

def date_range
  Date.parse(16.weeks.ago.to_s)..Date.today
end

def formatted
  data = date_range.inject({}) { |h,v| h[v.to_s] = {count: 0, messages: []}; h }
  cleaned.each do |commit|
    time, message = commit
    data[time.strftime('%Y-%m-%d')][:count] += 1
    data[time.strftime('%Y-%m-%d')][:messages] << message
  end
  data
end

def as_json(data)
  data.map { |k,v| {date: k, count: v[:count], messages: v[:messages]} }.to_json
end

def parsed_log
  as_json(formatted)
end
