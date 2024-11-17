# This is for Openshift

- Redhat Console Sandbox - [https://console.redhat.com/openshift/sandbox]

### Installation
- Install Docker Desktop on Windows
- [Local Setup] Openshift Requirement - 9GB Ram, 35GB Storage, 4 CPUs  [CodeReady Containers]
- [Developer Sandbox] - renew every 30days

### [CodeReady Containers]
- Signup for red hat account
- Article - [https://www.redhat.com/sysadmin/install-openshift-local]
- Download - [https://console.redhat.com/openshift/create/local]
- crc setup - does not work

### links
- Labs - [https://developers.redhat.com/learn?source=sso]
- Dev Cluster - [https://console-openshift-console.apps.sandbox-m4.g2pi.p1.openshiftapps.com/add/ns/mohsinali421-dev]
- Youtube Video - [https://www.youtube.com/watch?v=vu5w74xfLcA&t=132s]

### Login Commands
- login to sandbox -> ? -> command line tools
- oc
- Get token from console
- oc login
- oc status
- oc whoami
- oc logout

### Project Commands
- oc project               [displays current project]
- oc projects              [displays all projects]
- oc new-project myproject [create new project]
- oc project myproject     [switch between project]

### Explain documentaion commands
- oc explain
- oc explain pod
- oc explain pod.spec
- oc explain pod.spec.containers

### Pod commands - group of containers
- oc get pods                  [list of all pods]
- oc get pod [podname]         [list specific pod]
- oc create -f pods/pod.yaml   [create a new pod based on yaml file]
- oc rsh <pod>                 [shell inside a pod] 
- exit                         [exit shell]
- wget localhost:8080          [curl inside shell of pod]
- curl localhost:3001

### Delete pod
- oc delete pod/pod-name        [Delete a pod]
- oc delete pod "podName"       [Another way to delete a pod]
- oc get pods --watch           [two terminal is required]

### Pod Lifecycle
- Pending - trying to schedule a pod on a node
- ContainerCreating - openshift identified a node to create a pod and is now starting
- Running - it is now running 
- 1/1 - left side means total running container, right side indicates total containers in a pod
- Terminating - deleting pod

- YAML - yet another markup language (similar to json)

### Deployment config  [managing multiple pods deployemnt]
- oc explain deploymentconfig
- oc version   [version 4, --as-deployment-config for v4, omit for v3]
- oc new-app quay.io/practicalopenshift/hello-world --as-deployment-config
- oc status
- oc get pod
- oc get svc     [svc - service]
- oc get dc      [dc - deployment config]
- oc get istag   [istag - image stream tag]

### Delete Deployment resources
- oc delete svc/service-name
- oc delete dc/dc-name
- oc delete istag

### Delete using label selector
- oc describe dc/hello-world
- oc delete all -l app=hello-world
- oc status

### Naming Deployments
- oc new-app quay.io/practicalopenshift/hello-world --name demo-app --as-deployment-config
- oc status

### Deploy from git repo
- oc new-app https://gitlab.com/practical-openshift/hello-world.git --as-deployment-config
-- oc logs -f  bc/mohsin-git [build config]

### Replication Controller
- oc get rc

### Rollout-Rollback
- oc get pods --watch   [ 2 terminal required ]
- oc new-app quay.io/practicalopenshift/hello-world --name demo-app  --as-deployment-config
- oc rollout latest dc/demo-app
- oc rollback dc/demo-app
- oc rollout history dc/simple-docker-app
- oc rollout describe dc simple-docker-app
- oc rollout undo dc/simple-docker-app

### Services
- oc explain svc
- oc explain svc.spec
- oc create -f pods/pod.yaml 
- oc expose --port 8080 pod/hello-world-pod   [pod inside service]
- oc create -f pods/pod2.yaml 
- oc rsh hello-world-pod-2
- oc status  [ to get ip address of svc]
- wget -qO- 172.30.246.255:8080
- env   [inside a pod]
- wget -qO- $HELLO_WORLD_POD_PORT_8080_TCP_ADDR:$HELLO_WORLD_POD_PORT_8080_TCP_PORT

### get ip
- oc get pods -o wide

### Routes
- oc expose svc/hello-world-pod
- oc status
- curl [http//]

### Route Definition
- oc get routes
- oc get -o yaml route/hello-world-pod

## Config maps from literal [Max 1MB Storage]
- oc create configmap message-map --from-literal "key"="value"
- oc get configmap
- oc get -o yaml cm/mohsin-config

## Config maps from file
- oc create configmap message-map --from-file=MESSAGE.txt

### Config maps from directory
- oc create configmap my-path-config --from-file=./myfilte.txt
- oc get -o yaml configmap/my-path-config

### Secrets
- Opaque Secrets - for credentials, any key-value
- Service Account Token Secret - access internal openshift API's
- Docker Configuration Secret - for docker pulling and pushing images
- Simple Authentication Secret - Basic Auth, SSH Key, TLS Auth
- oc create secret generic my-secret --from-literal MESSAGE=secret
- oc get secret
- oc get -o yaml secret/my-secret - [base 64 encoded value]

### Consuming Secrets
- oc new-app quay.io/practicalopenshift/hello-world --as-deployment-config
- oc expose svc/hello-world
- oc status
- curl http://hello-world-mohsinali421-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com
- oc set env dc/hello-world --from secret/my-secret4- curl http://hello-world-mohsinali421-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com
- oc get -o yaml dc/hello-world


### Integration with Automatic Github Webhook Trigger