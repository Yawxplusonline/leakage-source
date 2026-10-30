import re

with open('data/catalog.ts', 'r', encoding='utf-8') as f:
    text = f.read()

def get_list(var_name):
    m = re.search(var_name + r'\s*=\s*\[(.*?)\];', text, re.DOTALL)
    if m:
        items = re.findall(r"'([^']+)'", m.group(1))
        return items
    return []

progs = ['generalArts', 'visualArts', 'science', 'business', 'homeEcon', 'agriculture']
all_elec = set()
for p in progs:
    items = get_list(p)
    all_elec.update(items)

def make_id(name):
    clean = re.sub(r'[^a-z0-9]+', '-', name.lower())
    return re.sub(r'(^-|-$)', '', clean)

elec_map = {make_id(name): name for name in sorted(all_elec)}
print(f'Total electives: {len(elec_map)}')
for k, v in elec_map.items():
    print(f'{k}: {v}')
