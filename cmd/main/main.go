package main

import (
	"encoding/json"
	"errors"
	"flag"
	"github.com/polarbirds/kate/internal/data"
	"github.com/polarbirds/kate/internal/server"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	"math/rand"
	"os"
	"os/signal"
)

const letterBytes = "abcdefghijklmnopqrstuvwxyz0123456789"

var dataFilePath string

var matches map[string]data.Match

func init() {
	log.Infof("Reading data")

	dataFilePath = *flag.String("data", "./kate-data.json", "path to file used to store data")
	dataBytes, err := ioutil.ReadFile(dataFilePath)
	if err != nil && !os.IsNotExist(err) {
		log.Fatal(err)
	}

	matches = make(map[string]data.Match)

	err = json.Unmarshal(dataBytes, &matches)
	if err != nil && len(dataBytes) > 0 {
		log.Fatal(err)
	}
	log.Infof("Data read bois")
}

func getUniqueMatchKey() (key string, err error) {
	for {
		key = RandStringBytesRmndr(4)
		if _, ok := matches[key]; !ok {
			return
		}
	}
	return key, errors.New("wut")
}

func RandStringBytesRmndr(n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Int63()%int64(len(letterBytes))]
	}
	return string(b)
}

func dumpData() error {
	var dataBytes []byte

	dataBytes, err := json.Marshal(matches)
	if err != nil {
		return err
	}
	log.Infof("saving data to %q", dataFilePath)
	err = ioutil.WriteFile(dataFilePath, dataBytes, 0600)

	return err
}

func listenShutdown() {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	signalsCaught := 0
	for sig := range c {
		signalsCaught++
		if signalsCaught == 2 {
			log.Infof("'%v' signal caught, preparing shutdown. "+
				"If shutdown is unsuccessful and you want to force-kill the process; "+
				"the process will force-quit after 5 signals caught. Keep spamming boss. "+
				"Signals caught: %d", sig, signalsCaught)
		} else if signalsCaught > 2 {
			log.Infof("'%v' signal #%d caught, preparing shutdown. ", sig, signalsCaught)
		} else {
			log.Infof("'%v' signal caught, preparing shutdown...", sig)
		}
		err := dumpData()

		if err != nil && signalsCaught < 5 {
			log.Error(err)
		} else {
			break
		}
	}
	log.Infof("Shutdown routine complete. Bye!")
}

func main() {
	go server.Start(matches)
	listenShutdown()
}
